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
    photo_id VARCHAR,
    catch_time TIMESTAMP DEFAULT now()
  );

CREATE TABLE ($user_name)Inventory (
  item_name VARCHAR(32),
  iphoto_id NUMERIC,
  quantatiy NUMERIC,
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


INSERT INTO profDex(prof_fname,prof_lname,photo_id) VALUES ('Andrei', 'Bulatov', 'ANDREI_BULATOV'), ('Greg', 'Baker', 'GREGORY_BAKER'), ('Bobby', 'Chan', 'BOBBY_CHAN'), ('Eugene', 'Fiume', 'EUGENE_FIUME');
INSERT INTO profDex(prof_fname,prof_lname,photo_id) VALUES ('Angel', 'Chang', 'ANGEL_CHANG'), ('Anoop', 'Sarkar', 'ANOOP_SARKAR'), ('Parmit', 'Chilana', 'PARMIT_CHILANA'), ('Yagiz', 'Aksoy', 'YAGIZ_AKSOY');
INSERT INTO profDex(prof_fname,prof_lname,photo_id) VALUES ('Ramesh', 'Krishnamurti', 'RAMESH_KRISHNAMURTI'), ('Sheelagh', 'Carpendale', 'SHEELAGH_CARPENDALE'), ('Harinder', 'Khangura', 'HARINDER_KHANGURA'), ('Binay', 'Bhattacharya', 'BINAY_BHATTACHARYA');


INSERT INTO camronProfList(prof_fname,prof_lname,photo_id) VALUES ('Greg', 'Baker', 'GREGORY_BAKER'), ('Bobby', 'Chan', 'BOBBY_CHAN'), ('Eugene', 'Fiume', 'EUGENE_FIUME'), ('Ramesh', 'Krishnamurti', 'RAMESH_KRISHNAMURTI'), ('Ramesh', 'Krishnamurti', 'RAMESH_KRISHNAMURTI'), ('Ramesh', 'Krishnamurti', 'RAMESH_KRISHNAMURTI'), ('Sheelagh', 'Carpendale', 'SHEELAGH_CARPENDALE'), ('Harinder', 'Khangura', 'HARINDER_KHANGURA'), ('Binay', 'Bhattacharya', 'BINAY_BHATTACHARYA');