---
title: Java - Spring Boot
categories:
feature_image: "https://picsum.photos/2560/600?image=872"
excerpt: Java - Spring Boot Training Track - Lesson 1 - This course will help you learn the basics of Java - Spring Boot, and the assignements will help you build a simple application with Sprin Boot, write REST API's and cover other features of a simple Spring Boot App.
---

<!-- more -->
# Java - Spring Boot Training Track - Lesson 1

Pre-requisites: If you are not familiar with Java, please take the Java Fundamentals Course before you start with this.


## Spring Boot starter
Follow this official guide to kickstart your own github project - [https://spring.io/quickstart](https://spring.io/quickstart)

* Once you have a first cut template in place checkin your code into github and share the project with the team.


## Maven/Gradle basics
If you do not understand Maven/Gradle - They are popular package managers for Java. \
Do try to understand them - No particular article - Just Research.


## Understanding important core concepts of Spring / Spring Boot
* Spring IOC and Dependency Injection Reference - [https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring](https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring)
* Spring Boot Annotations
    * This could be a good starting point - [https://springframework.guru/spring-framework-annotations/](https://springframework.guru/spring-framework-annotations/)
* Spring JPA
    * [https://www.baeldung.com/the-persistence-layer-with-spring-data-jpa](https://www.baeldung.com/the-persistence-layer-with-spring-data-jpa)
* Spring Data Repositories
    * [https://www.baeldung.com/spring-data-repositories](https://www.baeldung.com/spring-data-repositories)
* Spring Boot with Hibernate
    * [https://www.baeldung.com/spring-boot-hibernate](https://www.baeldung.com/spring-boot-hibernate)
* Spring Boot Security
    * [https://www.baeldung.com/spring-boot-security-autoconfiguration](https://www.baeldung.com/spring-boot-security-autoconfiguration)

Learn the above with examples and try it out.

## Goal

End of the learning you should be able to 

* Launch a new Spring Boot app/ Able to understand an existing Spring Boot App
* Understand How IOC works and what is dependency injection
* Able to use annotations correctly 
* Able to write a new GET/POST API in the right fashion
* Able to write Services and use them to perform some operation based on your request
* Understand how JPA works and create a DB connection with any DB using Hibernate
* Follow best practices with JPA, Spring Data and Spring Hibernate
* Able to protect GET and POST API’s using Spring security 


## Demonstrate understanding

* Once all of the above is done - you can demonstrate your learning and understanding by picking up a use case of your choice that covers all of the above goals and developing your own minor application. 
* Build the application, generate a Fat JAR file and launch the application from the JAR file for the demo.


### Assignment 1

* Write a Spring Boot App that covers the following use cases 
    * User Management - CRUD operations 
    * User able to create a password for the first time
    * User login - JWT Token 
    * Forgot password
    * OTP based login - Identify a provider for SMS
* Submit a design document - A high level design document on how you would want to approach the whole solution
* This has to be treated as a microservice - come tomorrow we have a new backend that needs authentication and authorization, we should be able to use this. 
* Implement RBAC implementation - Your DB schema should have a roles and permissions table to handle the same.
* Code has to be well written, following all best practices
* Prioritise your work and distribute it among the team members
* Each team will have to present their progress once in every two days
* Test cases will be a good to have


### Assignment 2

* Make the auth service configurable and as a package 
* We should be able to by configuration / by writing minimal amount of code use this service/package for other projects
* The core of the user entity must be defined and clients can add a new extendable class or config to extend the features / columns for a user
* RBAC should be enabled - with roles and granular level permissions
* The auth service should be able to enable / disable 2FA - and to start with 2FA will be OTP based but can be extendable
* Use an RDS as the datastore
* You need to come up with a design document first on how you would approach this problem
* Would like to see additional questions and clarifications on the problem statement
* Once the design is approved - you can start the development.


## Timelines

* The first design needs to be completed by  three days since the start of the course
* Once approval - and iterations, we can decide the next timelines