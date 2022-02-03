INSERT INTO projects(title, team_id, due_date, description, created_at, updated_at) VALUES ('Blackjack', null, datetime('2022-09-06'), "Making various versions of the game Blackjack.", datetime('now'), datetime('now'));
INSERT INTO projects(title, team_id, due_date, description, created_at, updated_at) VALUES ('Workflow Management', null, datetime('2022-03-04'), "Creating work flow management software.", datetime('now'), datetime('now'));

INSERT INTO project_1_tasks(description, due_date, complete) VALUES ("Create commandline blackjack", null, 1);
INSERT INTO project_1_tasks(description, due_date, complete) VALUES ("Create OOP commandline blackjack", null, 1);
INSERT INTO project_1_tasks(description, due_date, complete) VALUES ("Create OOP browser blackjack", null, 1);

INSERT INTO project_2_tasks(description, due_date, complete) VALUES ("Create form input for new project", null, 1);
INSERT INTO project_2_tasks(description, due_date, complete) VALUES ("Create bnackend to store and fetch projects", null, 1);
INSERT INTO project_2_tasks(description, due_date, complete) VALUES ("Create teams system", null, 0);