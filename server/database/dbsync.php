<?php

// This script resets database to an empty state, but with the tables we want.

$db = new SQLite3('database.sqlite');

// Remove any existing data
$drop_old_users_table = $db->query('DROP TABLE IF EXISTS users');
$drop_old_buys_table = $db->query('DROP TABLE IF EXISTS buyorders');
$drop_old_sells_table = $db->query('DROP TABLE IF EXISTS sellorders');
$drop_old_portfolio_table = $db->query('DROP TABLE IF EXISTS portfolios');
$drop_old_tokens_table = $db->query('DROP TABLE IF EXISTS tokens');
$drop_old_cache_table = $db->query('DROP TABLE IF EXISTS cache');

// Create new tables and associations
$create_users_table = $db->query('CREATE TABLE users(id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL)');
$create_buys_table = $db->query('CREATE TABLE buyorders(id INTEGER PRIMARY KEY, ordertime TIMESTAMP, quantity INTEGER, ticker TEXT, userid INTEGER, FOREIGN KEY (userid) REFERENCES users (id))');
$create_sells_table = $db->query('CREATE TABLE sellorders(id INTEGER PRIMARY KEY, ordertime TIMESTAMP, quantity INTEGER, ticker TEXT, userid INTEGER, FOREIGN KEY (userid) REFERENCES users (id))');
$create_portfolio_table = $db->query('CREATE TABLE portfolios(id INTEGER PRIMARY KEY, userid INTEGER, ticker TEXT, quantity INTEGER, updated TIMESTAMP, FOREIGN KEY (userid) REFERENCES users (id))');
$create_tokens_table = $db->query('CREATE TABLE tokens(id INTEGER PRIMARY KEY, token TEXT NOT NULL, userid INTEGER NOT NULL, FOREIGN KEY (userid) REFERENCES users (id))');
$create_cache_table = $db->query('CREATE TABLE cache(id INTEGER PRIMARY KEY, request TEXT NOT NULL, response TEXT NOT NULL, expiration TIMESTAMP)');