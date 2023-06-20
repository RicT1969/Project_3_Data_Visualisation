-- Create tables and import data

----------------------------------------------------------
-- Drop table if exists
DROP TABLE IF EXISTS quake_intensity_data;

-- Create new table (department)
CREATE TABLE quake_intensity_data 
(
  	id VARCHAR (10) NOT NULL,
 	name VARCHAR (50) NOT NULL,
	mmi INT NOT NULL,
	location INT NOT NULL,
	distance DECIMAL NOT NULL,
	station VARCHAR (10) NOT NULL,
	longitude DECIMAL NOT NULL,
	latitude DECIMAL NOT NULL,
	pga_h DECIMAL NOT NULL,
	pga_v DECIMAL NOT NULL,
	pgv_h DECIMAL NOT NULL,
	pgv_v DECIMAL NOT NULL,
	);
 
-- Verify successful data import
SELECT * FROM quake_intensity_data;

----------------------------------------------------------
-- Drop table if exists
DROP TABLE IF EXISTS quake_MMI_data;

-- Create new table (department)
CREATE TABLE quake_MMI_data 
(
  	publicID VARCHAR (10) NOT NULL,
 	date date (50) NOT NULL,
	mmi INT NOT NULL,
	magnitude DECIMAL NOT NULL,
	locality VARCHAR (250) NOT NULL,
	longitude DECIMAL NOT NULL,
	latitude DECIMAL NOT NULL,
	time timestamp NOT NULL,
	depth DECIMAL NOT NULL,
	PRIMARY KEY (publicID)
);
 
-- Verify successful data import
SELECT * FROM quake_MMI_data;

----------------------------------------------------------
-- Drop table if exists
DROP TABLE IF EXISTS volcano_data;

-- Create new table (department)
CREATE TABLE volcano_data
(
  	volcanoID VARCHAR (10) NOT NULL,
 	volcanoTitle VARCHAR (50) NOT NULL,
	longitude DECIMAL NOT NULL,
	latitude DECIMAL NOT NULL,
	acc VARCHAR (15) NOT NULL,
	activity VARCHAR (50) NOT NULL,
	level INT NOT NULL,
	hazards VARCHAR (250) NOT NULL,
	PRIMARY KEY (volcanoID)
);
 
-- Verify successful data import
SELECT * FROM volcano_data;

--------------------------------------------------------	