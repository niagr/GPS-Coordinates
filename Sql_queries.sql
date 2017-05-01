CREATE TABLE location(
 latitude varchar(10) NOT NULL,
 longitude varchar(10) NOT NULL,
 time time NOT NULL,
 date date NOT NULL,
 sr_no bigserial NOT NULL,
 trip_id uuid NOT NULL);

-- stores the route which the bus will take to reach destination
 CREATE TABLE routes(
     latitude varchar(10) NOT NULL,
     longitude varchar(10) NOT NULL,
 );


--store the current trip_id for a given route
CREATE TABLE gettripid(
     route_id smallint NOT NULL,
     trip_id uuid NOT NULL
);