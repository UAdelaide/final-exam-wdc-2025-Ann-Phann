-- Insert Five Users
INSERT INTO Users (username, email, password_hash, role) VALUES
('alice123', 'alice@example.com', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('davewalker', 'dave@example.com', 'hashedabc', 'walker'),
('eveowner', 'eve@example.com', 'hashedxyz', 'owner');

-- Insert Five Dogs
-- Dog 1: Max (owned by alice123)
INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium');

-- Dog 2: Bella (owned by carol123)
INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small');

-- Dog 3: Rocky (owned by carol123)
INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Rocky', 'large');

-- Dog 4: Daisy (owned by eveowner)
INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = 'eveowner'), 'Daisy', 'small');

-- Dog 5: Buddy (owned by alice123)
INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Buddy', 'medium');


-- Insert Five Walk Requests
-- Request 1 for Max (owned by alice123)
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT d.dog_id FROM Dogs d JOIN Users u ON d.owner_id = u.user_id WHERE d.name = 'Max' AND u.username = 'alice123'), '2025-06-10 08:00:00', 30, 'Parklands', 'open');

-- Request 2 for Bella (owned by carol123)
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT d.dog_id FROM Dogs d JOIN Users u ON d.owner_id = u.user_id WHERE d.name = 'Bella' AND u.username = 'carol123'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted');

-- Request 3 for Rocky (owned by carol123)
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT d.dog_id FROM Dogs d JOIN Users u ON d.owner_id = u.user_id WHERE d.name = 'Rocky' AND u.username = 'carol123'), '2025-06-11 10:00:00', 60, 'City Park', 'open');

-- Request 4 for Daisy (owned by eveowner)
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT d.dog_id FROM Dogs d JOIN Users u ON d.owner_id = u.user_id WHERE d.name = 'Daisy' AND u.username = 'eveowner'), '2025-06-12 14:00:00', 30, 'Suburb Streets', 'open');

-- Request 5 for Buddy (owned by alice123)
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT d.dog_id FROM Dogs d JOIN Users u ON d.owner_id = u.user_id WHERE d.name = 'Buddy' AND u.username = 'alice123'), '2025-06-13 16:00:00', 45, 'Dog Park East', 'open');