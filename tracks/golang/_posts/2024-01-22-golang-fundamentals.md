---
title: Fundamentals of Go Lang
feature_image: "https://picsum.photos/2560/600?image=872"
excerpt: |
  ### Get Started with Go
  This course will help you get started with the basics of Go, help you learn concepts beyond the programming language to enable you to make the most of Go.
feature_text: |
  ## GoLang Fundamentals
  

---
<!-- more -->

# Get Started with Go
This will be a self learning course - We have curated topics that are important and articles that correspond to each of them. 
Please take time to understand each one of them both theoretically and practically.

#### Processes and Threads 

{% include video.html id="4rLW7zg21gI" %}

#### Concurrency & Parallelism
{% include video.html id="r2__Rw8vu1M" %}

#### Cryptography and its types
[Resourse Link](https://www.geeksforgeeks.org/cryptography-and-its-types/)

#### Go Lang Environment Setup
[Resource Link](https://dev.to/willvelida/setting-up-our-go-development-environment-45jk)

#### What is make file and how to use it!
[Resource Link](https://medium.com/@ayogun/what-is-makefile-and-make-how-do-we-use-it-3828f2ee8cb)

#### Hello World! in GoLang
[Resource Link](https://gobyexample.com/hello-world)

#### What are packages in Go Lang ?
[Resource Link](https://www.geeksforgeeks.org/packages-in-golang/)

#### How import and export works in Go Lang
[Resource Link](https://www.golangprograms.com/golang-import-and-export-struct-packages-and-interfaces.html)

## Timelines
Expecteations is to complete this course in 3days, from when the course has begun.

## Assginment - 1

You are part of the security team at Webknot and have been given the task to transport some confidential data to a client. To prevent any loss, the data should be encrypted in transit. 
The data is stored in a text file (Approx 1GB) and each line in the file contains exactly one JSON object representing some important information. The goal is to read the file efficiently using different concepts of concurrency and parallelism, encrypt the contents using an encryption key and store the encrypted contents back to a file. The file will then be transferred to the client where he can use the encryption key to get back the original contents.

#### Points to Remember:
The solution should be a CLI driven program (Make can be used here) with following expected behaviour.

To encrypt the file
```
main.go encrypt --file ./imp-data.txt --key bHB&fuw2GD*I@B --out ./imp-data-enc.txt
```
```
Args:
   	-file : Path to the input file
    -key  : Encryption key
    -out  : Path to the output encrypted file
```

To decrypt file
```
main.go decrypt --file ./imp-data-enc.txt --key bHB&fuw2GD*I@B --out ./imp-data.txt
```
```
Args:
   	--file : Path to the encrypted file
    --key  : Encryption key
    --out  : Path to the output decrypted file
```
- Download the zip file containing the input file from here. [imp-data.txt.zip](https://drive.google.com/file/d/1xGiumB37jaqB69qvTop2YPkrdQoyvfnY/view?usp=sharing)
- To view the contents of the input file, use this smaller size file. [Imp-data-short.txt](https://drive.google.com/file/d/1FoG0h2tmMGzaZw-IrH-PD3JT3S3i1n2x/view?usp=sharing)

- Add verbose logging as much as possible

#### Note:
We can encrypt the text file in a single go, but that's not the goal here. This assignment will help you in building optimal solutions to real world problems. How to divide large data into smaller chunks and process those chunks to achieve the desired result is our goal here.



