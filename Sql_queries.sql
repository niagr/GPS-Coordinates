CREATE TABLE location(
 latitude varchar(10) NOT NULL,
 longitude varchar(10) NOT NULL,
 time time NOT NULL,
 date date NOT NULL,
 sr_no bigserial NOT NULL PRIMARY KEY,
 trip_id uuid NOT NULL);

--store the current trip_id for a given route
CREATE TABLE gettripid(
     route_id smallint NOT NULL,
     trip_id uuid NOT NULL
);

CREATE TABLE routes (
    route_id smallint NOT NULL PRIMARY KEY
);

CREATE TABLE route_coords (
    route_id smallint NOT NULL,
    latitude varchar(10) NOT NULL,
    longitude varchar(10) NOT NULL,
    is_stop boolean NOT NULL DEFAULT false,
    stop_name varchar(20)
);