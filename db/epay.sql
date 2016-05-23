/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2016/5/10 16:38:40                           */
/*==============================================================*/

create database epay default charset utf8;

use epay;

/*==============================================================*/
/* Table: admin                                                 */
/*==============================================================*/
create table admin
(
   aid                  int not null auto_increment,
   aname                varchar(100),
   email                varchar(100),
   password             varchar(100),
   issuper              int,
   addtime              datetime,
   primary key (aid)
);
insert into admin values(default,'超级管理员','admin@qq.com','admin',0,now());

/*==============================================================*/
/* Table: news                                                  */
/*==============================================================*/
create table news
(
   nid                  int not null auto_increment,
   ntitle               varchar(100),
   content              text,
   pubdate              datetime,
   author               int,
   primary key (nid)
);

/*==============================================================*/
/* Table: product                                               */
/*==============================================================*/
create table product
(
   pid                  int not null auto_increment,
   pname                varchar(100),
   price                numeric(10,2),
   strock               int,
   imgpath              varchar(200),
   type                 int,
   primary key (pid)
);

/*==============================================================*/
/* Table: producttype                                           */
/*==============================================================*/
create table producttype
(
   tid                  int not null auto_increment,
   typename             varchar(100),
   typeinfo             varchar(500),
   pid                  int,
   primary key (tid)
);

