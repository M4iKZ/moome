MOOME Discord Bot
=================

This bot allows you to easily create and manage temporary channels on your server. It can automatically remove any channels that are no longer needed, ensuring that your server stays organized and clutter-free.

Features
--------

* **Token bot**: From discord developer section you should create a new application and transform it in a BOT, take the TOKEN_BOT and replace it into main.js
* **Channel creation**: You need to set in main.js the CHANNEL_ID for main channel where people can join to create a new channel and CATEGORY_ID that is used as category for temporary channel to give the same permissions to every channel.
* **Customizable names**: If a user has their ID stored in a separate "users" folder in main directory, the bot will use the stored name in the file with the user id as name file.
* **Deletion of unused channels**: When a channel is empty the bot will delete it.
* **Optional confirmation before deleting a channel**: WIP function added in the future.

Installation
------------

```
git clone https://github.com/M4iKZ/MOOME
npm i
node main.js
```
