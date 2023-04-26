-- migrate:up
CREATE TABLE post_likes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    CONSTRAINT FK_Post_Likes_User_ID FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT FK_Post_Likes_Post_ID FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- migrate:down
DROP TABLE post_likes;
