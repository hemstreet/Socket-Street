Socket-Street
=

[Draft Tech plan](https://www.dropbox.com/s/4306gm5obwo1ctj/Socket-Street-plan-1-3-2016.jpg)

**Description**
The purpose of this project is to provide a prototype of a socket server for communication and event driven actions.
The server will also be able to be used for CRUD actions via events and save data into a database. There will be a web 
interface to manage the collections. This will act as a supporting platform for future socket / Internet of Things projects.

**Goals** 
* [ ] Fire events for CRUD, data passed is `{ model: model, data, data }` for update pass GUID
* [ ] Integrate mongoose
* [ ] Implement Angular admin panel
* [ ] Apply styles to front end

Setup
==
* `npm install` 
* `gulp`