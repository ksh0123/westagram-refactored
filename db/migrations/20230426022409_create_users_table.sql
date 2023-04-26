-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(512) NOT NULL,
    password VARCHAR(512) NOT NULL,
    nickname VARCHAR(255) NOT NULL,
    first_name VARCHAR(512) NOT NULL,
    last_name VARCHAR(512) NOT NULL,
    profile_image VARCHAR(512) NULL
);

-- migrate:down
DROP TABLE users;
