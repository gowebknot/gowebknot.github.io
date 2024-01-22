---
title: Integrate Postgres with ERPNext/Frappe
feature_text: ERPNext and Frappe both say that having postgres as a db for erpnext is not possible, but this blog will prove otherwise.
excerpt: |
  ## ERPNext Integration with Postgres
  This blog will teach you how to connect your ERP Next with Postgres, both Local and Production.
feature_image: https://cdn-images-1.medium.com/max/8192/1*RZ1ChkUhqJqxyqB2Yw4YaA@2x.jpeg
---
Frappe has done an amazing job building ERPNext, but for some reason it just doesn’t integrate well with Postgres.

> ERPNext and Frappe both say that having postgres as a db for erpnext is not possible, but this blog will prove otherwise.

Follow these steps carefully as one wrong configuration and you might need to setup the site again.

### Step 0:

Make sure you have checked to use the following configuration:

> ### Postgres version <= 14.10
>
> ### Postrges Master Username: postgres
>
> ### Postgres Default DB: postgres
>
> ### Publicly Accessible: Yes

### Step 1:

First setup frappe-bench.

Instructions for the same: https://github.com/frappe/bench

### Step 2:

Now go to ./frappe-bench/common-site-config.json and add these:

> ### “db_host”: “`<db endpint>`”,
>
> ### “rds_db”: 1,
>
> ### “ssl”: true

If your db is locally hosted, you dont need to add these to the file. You can go to step 3.

### Step 3:

Now run:

> ### bench new-site `<site-name>` – db-type postgres

Give the password of the username ‘postgres’.

The site should now setup.

### Step 4:

After this the process is basically the same.

Install ERPNext on your site (if required):

> ### bench get-app https://github.com/frappe/erpnext

### Step 5:

Install the site

> ### bench – site [site-name] install-app erpnext

and

> ### bench use [site-name]

Now you can start the app with

> ### bench start
>
> This is a picture of me using ERPNext with RDS(Postgres)

![](https://cdn-images-1.medium.com/max/3436/1*Y-_79bSSRf0o-nwvv9ahQQ.png)

Hope you found this blog helpful :).
