CREATE TABLE users (
  user_name VARCHAR(32) PRIMARY KEY,
  password VARCHAR(32),
  status   VARCHAR(32),
  last_updated TIMESTAMP DEFAULT now(),
  record_created TIMESTAMP DEFAULT now()
);

  CREATE TABLE camronProfList (
    prof_fname VARCHAR(32),
    prof_lname VARCHAR(32),
    photo_id NUMERIC,
    catch_time TIMESTAMP DEFAULT now()
  );

CREATE TABLE ($user_name)Inventory {
  item_name VARCHAR(32),
  iphoto_id NUMERIC,
  quantatiy NUMERIC,
  item_added TIMESTAMP DEFAULT now()
};

CREATE TABLE profDex (
  prof_fname VARCHAR(32),
  prof_lname VARCHAR(32),
  photo_id NUMERIC,
  last_updated TIMESTAMP DEFAULT now(),
  record_created TIMESTAMP DEFAULT now()
);
