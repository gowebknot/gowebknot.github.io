---
title: From Manual Drudgery to Automation Maestro: Mastering Ansible with Docker
feature_text: Try ansible with local setup using Docker
excerpt: |
  ## Create local playground for ansible using docker
  This blog will teach you very basics of ansible using local playground setup
feature_image: https://developers.redhat.com/sites/default/files/styles/large/public/Dev%20Spaces%20Ansible%20LP%20Featured%20image.png?itok=tEhxZd41
author: Sandheep Kumar
---

This blog post whisks you away from the drudgery of manual server configuration and into the empowering realm of automation with Ansible ✨. Ever feel like a rockstar chef, forced to hand-chop every veggie , meticulously measure spices ⚖️, and build the fire from scratch for every dish? That's exactly how I felt when manually configuring servers!

Fear not, fellow automation enthusiasts! Ansible, a powerful configuration management tool, offers the perfect recipe for automation mastery. This blog post equips you with the knowledge to set up a local Ansible environment using Docker, creating your own personal automation playground .

**Why Learn Ansible?**

Two main reasons fueled my Ansible learning adventure:

1. **Local Setup Automation:** My exploration of various Linux distributions for my ideal setup often left me yearning for a quick way to revert back to a familiar configuration. Ansible swooped in like a knight in shining armor ️️, allowing me to automate this process and regain my preferred environment in a flash ⚡️.
    
2. **Remote Server Automation:** Recently, I had the opportunity to set up a server and a CI/CD pipeline. This involved a lot of repetitive tasks like installing OS-specific packages , configuring reverse proxies , generating SSH keys , and setting up local repositories. Ansible offered a way to automate these pre-project tasks, streamlining the development process . Remember, with automation comes efficiency, but it's always wise to be aware of potential "thorns" (errors or unexpected behavior) that may arise .
    

**Why Choose a Local Setup Over the Cloud? ☁️**

While cloud platforms like AWS offer readily available resources and online tutorials, I opted for a local setup. This decision, though requiring more effort, provided valuable hands-on experience, particularly with SSH . This knowledge will undoubtedly prove beneficial in the long run .

**Prerequisites **

- **Docker:** [https://www.docker.com/](https://www.docker.com/)
- **Text Editor:** While options like VS Code, Neovim, and Zed are popular choices, even a simple text editor like Notepad will work. The magic happens in the terminal! 🪄

**Folder Structure**

```bash
Learn-Ansible/
│  ├── hosts
│  └── playbooks/
│    ├── ping.yml
│    ├── gather_facts.yml
│    ├── log_os.yml
│  ├── run_all.yml
│  ├── Dockerfile  (Optional: Create a custom Ansible Docker image)
│  ├── docker-compose.yml  (Optional: Manage all Docker services with a single command)
# and so on...
```

**Demystifying the Folder Structure: Your Roadmap to Ansible Automation**

Now that you're fired up about conquering automation with Ansible and Docker, let's navigate the folder structure that will be your roadmap to success. Think of it as a well-organized kitchen – everything has its designated place, making it easy to find the ingredients (playbooks) you need to whip up automation magic ✨.

**The Root of Automation: Learn-Ansible**

This is the main directory that will house all your Ansible goodies. Imagine it as your well-stocked pantry, brimming with the potential to automate various tasks.

**Essential Ingredients: The hosts Directory**

Inside `Learn-Ansible`, you'll find the `hosts` directory. This is where you'll define the servers or systems Ansible will manage, like your trusty kitchen appliances (your laptop, server, etc.). Each server can be listed with its hostname or IP address, allowing Ansible to identify and configure them.

**The Recipe Box: The playbooks Directory**

This is the heart of your automation kitchen! Here, you'll create Ansible playbooks – essentially your recipes – that outline the specific tasks you want Ansible to perform on your managed servers. Each playbook is typically a YAML file (think recipe instructions!), detailing the steps to configure software, manage files, or execute commands.

We'll delve deeper into creating playbooks in the next section, but for now, understand that this is where the magic happens!

**Enough of storytelling, let's get into code now!**

Now that we've explored the why and the how behind using Docker for a local Ansible setup, let's dive into the code itself. We'll cover three main parts:

1. Local Setup with Dockerfile and generating docker image using `docker build`
2. Creating a container using the image generated in the previous step using `docker-compose`
3. Playing with Ansible

**Local Setup with Dockerfile**
```Dockerfile

# Use the official image as a parent image
FROM ubuntu

# Update the system, install OpenSSH Server, and set up users
RUN apt-get update && apt-get upgrade -y && \
  apt-get install -y openssh-server && apt-get install sudo -y && apt-get install sshpass -y

# Create user and set password for user and root user
RUN  useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1000 ubuntu && \
  echo 'ubuntu:your_secret_password_here' | chpasswd && \
  echo 'root:your_secret_password_here' | chpasswd

# Set up configuration for SSH
RUN mkdir /var/run/sshd && \
  sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
  sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd && \
  echo "export VISIBLE=now" >> /etc/profile

# Expose the SSH port
EXPOSE 22

# Run SSH
CMD ["/usr/sbin/sshd", "-D"]
```
 **Full on explanation of the `Dockerfile `**
 The provided `Dockerfile` defines a custom Docker image specifically tailored for running Ansible within a container. Here's a breakdown of the code:

**1. Base Image:**

Dockerfile

```Dockerfile
FROM ubuntu
```

This line sets the foundation for our image by using the official `ubuntu` image from Docker Hub. This image provides a base Linux environment with essential packages pre-installed.

**2. System Updates and Package Installation:**


```Dockerfile
RUN apt-get update && apt-get upgrade -y && \
 apt-get install -y openssh-server sudo sshpass
```

This block of code performs several actions:

- `apt-get update`: Updates the list of available packages from the repositories.
- `apt-get upgrade -y`: Upgrades all installed packages to their latest versions (the `-y` flag skips confirmation prompts).
- `apt-get install -y openssh-server sudo sshpass`: Installs three crucial packages:
    - `openssh-server`: Enables SSH server functionality within the container, allowing you to connect remotely.
    - `sudo`: Provides elevated privileges for executing commands with administrative rights.
    - `sshpass`: A tool that allows you to specify the SSH password on the command line, simplifying automation.

**3. User Creation and Password Setup:**

```Dockerfile
RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1000 ubuntu && \
 echo 'ubuntu:your_sudo_password_here' | chpasswd && \
 echo 'root:your_sudo_password_here' | chpasswd
```

This section creates two users:

- `ubuntu`: This user will be used for interacting with the container.
    - `-rm`: Removes the user upon container termination.
    - `-d /home/ubuntu`: Sets the home directory for the user.
    - `-s /bin/bash`: Defines the default shell for the user (bash).
    - `-g root -G sudo`: Assigns the user to the `root` and `sudo` groups, granting administrative privileges.
    - `-u 1000`: Sets the user ID (UID) to 1000 (commonly used for the `ubuntu` user).
- `root`: The root user is also created and assigned the same password as the `ubuntu` user. **Note:** It's generally not recommended to run as root within containers for security reasons.

**4. SSH Configuration:**
```Dockerfile
RUN mkdir /var/run/sshd && \
 sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
 sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd && \
 echo "export VISIBLE=now" >> /etc/profile
```

These commands configure the SSH server within the container:

- `mkdir /var/run/sshd`: Creates the directory required by the SSH daemon.
- `sed`: A command-line tool for text manipulation. Here, it modifies two files:
    - `/etc/ssh/sshd_config`: This file controls the SSH server behavior. The `sed` command replaces the line `PermitRootLogin prohibit-password` with `PermitRootLogin yes`, allowing root login via SSH (**caution: use with care!**).
    - `/etc/pam.d/sshd`: This file defines the authentication process for SSH. The `sed` command modifies a line related to the `pam_loginuid.so` module, potentially simplifying login for automation scripts (consult the documentation for details).
- `echo "export VISIBLE=now" >> /etc/profile`: This line adds an environment variable to the user's profile, potentially aiding graphical applications within the container (consult the documentation for specific use cases).

**5. Exposing the SSH Port:**
```Dockerfile
EXPOSE 22
```

This line exposes port 22 (the standard SSH port) of the container. This allows you to connect to the container using SSH from your local machine.

**6. Running the SSH Daemon:**


```Dockerfile
CMD ["/usr/sbin/sshd", "-D"]
```

This line sets the default command for the container. It executes the SSH daemon (`/usr/sbin/sshd`) with the `-D` flag, which enables background mode, keeping the container running even after you disconnect from the SSH session.

>**Why Dockerfile? Why not the ubuntu image itself?**
>
>The base Ubuntu image might lack specific packages required for your Ansible workflow. The provided Dockerfile addresses this by installing essential tools:
>- `openssh-server`: Enables SSH functionality within the container for remote management.
>- `sudo`: Grants elevated privileges for administrative tasks often needed by Ansible.
>- `sshpass`: Simplifies automation by specifying the SSH password on the command line.
>
>Additionally, a Dockerfile allows you to create a new user specifically for your experiments (e.g., `ubuntu` in this case). This dedicated user serves as your primary point of interaction within the container for running Ansible playbooks and managing configurations.
>
>In essence, a Dockerfile provides greater control, ensures the necessary tools are present, and creates a clean environment for your Ansible automation endeavors.

**Creating an SSH Accessible Ubuntu Container with Docker Compose**

This guide details the process of setting up an Ubuntu container accessible via SSH using Docker Compose.

**Prerequisites:**

- Docker installed and running on your system

**Steps:**

1. **Define the Docker Compose configuration:**
    
    Create a file named `docker-compose.yml` with the following content: 
    ```yaml
    version: "3.8"
    
    services:
      ubuntu-ssh:
        image: ubuntu-ssh
        container_name: ansible-node
        ports:
          - "2222:22"
    ```
    
    - This configuration defines a service named `ubuntu-ssh` that utilizes the `ubuntu-ssh` image.
    - The container will be named `ansible-node`.
    - Port 2222 on the host machine is mapped to port 22 (default SSH port) inside the container, allowing remote access.
2. **Start the container:**
    
    Open a terminal and navigate to the directory containing the `docker-compose.yml` file. Run the following command:
    ```bash
    docker-compose up -d
    ```
    
    - This command instructs Docker Compose to build and start the container in detached mode (`-d`).
3. **Connect to the container:**
    
    Use the following command to establish an SSH connection to the container:
    ```bash
    ssh -o PubkeyAuthentication=no ubuntu@localhost -p 2222
    ```
    
    - **Explanation:**
        - `ssh`: Initiates the SSH connection.
        - `-o PubkeyAuthentication=no`: Disables public key authentication (more secure methods attempted by default).
        - `ubuntu@localhost`: Specifies the username (`ubuntu`) and hostname (`localhost`).
        - `-p 2222`: Defines the port number (`2222`) for the connection.


**Buckle up**, Ansible adventurer! Prepare to unleash your automation superpowers in this **glorious** Ansible playground! Get ready to conquer mountains of tasks and wrestle servers to the ground (with love, of course) This is your personal Ansible bootcamp, where the learning is **epic** and the possibilities are **endless**

**Wanna install anisble?**
```shell
pip install ansible
```
Though i have provided a very simple way to install ansible, it's always good to know [other ways to install ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) 

**Demystifying Ansible: A Glossary for Automation Ninjas**

As we've explored Ansible's capabilities, you might be itching to dive into automation headfirst. But to ensure your automation journeys are smooth sailing, let's solidify your understanding of some key Ansible terms.

- **Tasks: Your Automation Arsenal**
    
    - Think of tasks as the building blocks of automation. They represent specific actions like installing software packages, cloning Git repositories, configuring shells, or creating sudo users.
- **Plays: Orchestrating Your Automation Symphony**
    
    - Plays are individual automation routines that group related tasks. They define a specific set of actions to be performed on your target systems.
- **Playbooks: The Blueprint for Automation Success**
    
    - Playbooks are the heart of Ansible automation. These YAML files act as scripts, meticulously laying out the plays and tasks to be executed in a precise sequence.
- **Inventory Files: Defining Your Automation Landscape**
    
    - The inventory file, often referred to as the `hosts` file, is your map to the target servers. It stores information about the machines where your automation magic will take place. Imagine this file as your target list for automation missions.

**Inventory File Example: Deciphering the Code**

Here's a breakdown of a sample `hosts` file, showing the details for a server named `node1`:

```Ini
# learn-ansible/hosts
node1 ansible_user=ubuntu ansible_host=localhost ansible_port=2222 ansible_password=your_secret_password_here ansible_ssh_common_args='-o PubkeyAuthentication=no' ansible_become_pass=your_secret_password_here
```

- **`node1`:** This is an alias, a friendly name for your server in the playbooks. It makes your automation scripts easier to read and maintain.
- **`ansible_user=ubuntu`:** This specifies the username "ubuntu" for SSH connections to the server represented by the alias `node1`.
- **`ansible_host=localhost`:** This targets the machine running Ansible itself (replace with the actual server hostname if it's not localhost).
- **`ansible_port=2222`:** This tells Ansible to connect to port 2222 for SSH instead of the default port 22.
- **`ansible_password=your_secret_password_here`:** This provides the password for authentication as the "ubuntu" user on the server.
- **`ansible_ssh_common_args='-o PubkeyAuthentication=no'`:** This disables public key authentication, forcing password-based authentication for this specific server.
- **`ansible_become_pass=your_secret_password_here`:** This provides the password for privilege escalation using `sudo` commands on the server.

**Playbook File Example: Putting Automation into Action**

This sample playbook demonstrates how to install specific software and configure the default shell on the `node1` server.:

```yml 
# learn-ansible/playbook/install_playbook.yml
--- 
- name: Play for installing curl, zsh, python and pip
  hosts: node1
  gather_facts: false
  tasks:
    - name: Install curl
      ansible.builtin.apt:
        name: curl
        state: present

    - name: Install zsh, python and pip
      ansible.builtin.apt:
        name:
          - zsh
          - python3
          - python3-pip
        state: present

- name: Play for choosing zsh as default shell
  hosts: node1
  gather_facts: false
  tasks:
    - name: Choose zsh as default shell
      ansible.builtin.user:
        name: ubuntu
        shell: /bin/zsh
      become: true

```

 **Playbook (YAML: `---`)**

Imagine a playbook as the architect's blueprint for your automation project. It's a YAML file that meticulously outlines the entire automation sequence. This file serves as the central command center, dictating the plays, tasks, and target systems involved in your automation mission.

```yml
---
# This line signifies the start of the YAML document
```

**Play (YAML: Indented Block)**

Think of a play as an individual act within your automation play (just like a play in a theatrical production). Each play groups related tasks that target specific goals. You can have multiple plays in a single playbook, allowing you to tackle different automation objectives in a structured manner.

Here's an example play from the sample playbook:

```yml
- name: Play for installing curl, zsh, python and pip  # Play definition with a descriptive name
  hosts: node1  # This targets the server aliased as 'node1' in your hosts file
  gather_facts: false  # Optional, skips information gathering

  tasks:  # This indented block contains all tasks for this play
    # ... task definitions ... (explained later in Tasks section)
```

**Tasks (YAML: Further Indented Block)**

Tasks are the fundamental building blocks of automation within a play. They represent specific actions to be executed on the target system. A play can have numerous tasks strung together in a particular order to achieve the desired outcome. These tasks are like the individual instructions an actor follows on stage to bring the play to life.

Here's an example task definition within a play:

```yml
  tasks:
    - name: Install curl  # Task definition with a descriptive name
      ansible.builtin.apt:  # The module used for package management
        name: curl  # The specific package to install
        state: present  # Desired state (ensure curl is installed)
```

**Efficiently Manage Multiple Servers with Ansible Inventory Groups**

Ansible empowers you to automate tasks across numerous servers simultaneously. This guide demonstrates how to achieve this using inventory groups within your Ansible configuration.

**Grouping Servers for Simplified Management**

1. **Inventory File:**
    
    - Edit your Ansible inventory file (`hosts` by default).
    - Define groups to categorize your servers logically. For instance, create a group named `group1` to encompass servers `node1` and `node2`.
```ini
[group1]
node1 ansible_user=ubuntu ansible_host=localhost ansible_port=2222 ansible_password=your_secret_password_here ansible_ssh_common_args='-o PubkeyAuthentication=no' ansible_become_pass=your_secret_password_here
node2 ansible_user=ubuntu ansible_host=localhost ansible_port=2223 ansible_password=your_secret_password_here ansible_ssh_common_args='-o PubkeyAuthentication=no' ansible_become_pass=your_secret_password_here
```

2. **Playbook Targeting Groups:**
    
    - Modify your Ansible playbook to target the newly created group.
    
    ```yml
    ---
    - name: Install curl, zsh, Python, and pip
      hosts: group1
      gather_facts: false
      tasks:
        # ... your Ansible tasks here
    ```
    
    - The `hosts: group1` line specifies that this play should execute on all servers within the `group1` group.

**Scaling with Multiple Groups**

- Create additional groups in your inventory file to organize more servers.
    
- Update your playbooks to target multiple groups using a colon (`:`) separator.
    
    
    ```yml
    ---
    - name: Install software across all servers
      hosts: group1:group2
      gather_facts: false
      tasks:
        # ... your Ansible tasks here
    ```
    
    - This playbook will execute on all servers in both `group1` and `group2`.


Now the final step, run the code in the terminal 

```shell
# pwd :- learn-ansible 
ansible-playbook -i hosts playbooks/install_playbook.yml
```
