CREATE TABLE users (
  user_name VARCHAR(32) PRIMARY KEY,
  password VARCHAR,
  status   VARCHAR(32),
  last_updated TIMESTAMP DEFAULT now(),
  record_created TIMESTAMP DEFAULT now()
);

  CREATE TABLE camronProfList (
    prof_id SERIAL PRIMARY KEY,
    prof_fname VARCHAR(32),
    prof_lname VARCHAR(32),
    photo_id NUMERIC,
    catch_time TIMESTAMP DEFAULT now()
  );

CREATE TABLE ($user_name)Inventory (
  item_name VARCHAR(32),
  iphoto_id NUMERIC,
  quantity NUMERIC,
  item_added TIMESTAMP DEFAULT now()
);

CREATE TABLE profDex (
  prof_id SERIAL PRIMARY KEY,
  prof_fname VARCHAR(32),
  prof_lname VARCHAR(32),
  photo_id VARCHAR,
  last_updated TIMESTAMP DEFAULT now(),
  record_created TIMESTAMP DEFAULT now()
);

INSERT INTO dusanInventory(item_name, iphoto_id, quantity) VALUES ('Prof Office Hours',1,0);

INSERT INTO profDex(prof_fname,prof_lname,photo_id) VALUES ('Andrei', 'Bulatov', 13), ('Greg', 'Baker', 33), ('Bobby', 'Chan', 25);

INSERT INTO camronProfList(prof_fname,prof_lname,photo_id) VALUES ('Andrei', 'Bulatov', 13), ('Andrei', 'Bulatov', 13),('Andrei', 'Bulatov', 13),('Greg', 'Baker', 33), ('Bobby', 'Chan', 25);
