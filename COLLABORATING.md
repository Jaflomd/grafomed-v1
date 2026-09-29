# Working with GrafoMed v1

This repository contains the games lab, local learning application, graph viewers,
prototypes, content packs, source records, and supporting scripts and tests.
Python 3.9+ is sufficient to run the games and the local application.

## Clone

```sh
git clone https://github.com/Jaflomd/grafomed-v1.git
cd grafomed-v1
```

The repository is private. Collaborators need GitHub access from the owner.

## Open the games

From the repository root:

```sh
python3 -m http.server 8788 --bind 127.0.0.1 --directory app/static
```

Open http://127.0.0.1:8788/games-lab.html and use the bottom selector to switch games.
Keep the terminal running while playing. Ctrl-C stops the server.
The games are standalone browser prototypes; this static server does not provide
the learning application's SQL API. Fonts use Google Fonts.

The main game files are `app/static/games-lab.html`,
`app/static/games-lab.css`, and `app/static/games-lab.js`.

## Run the learning application

```sh
python3 app/server.py
```

Open http://127.0.0.1:8787. The first run creates a local database.
See `app/README.md` for content releases, API behavior, and limitations.
Existing local databases are deliberately excluded from Git. If a reused
database reports that release content changed, preserve it and use a fresh
database path, for example `python3 app/server.py --db app/data/fresh.sqlite3`.
Use the separate static server above to open the games lab.

## Contribute

Create a branch, make changes, and submit a pull request for review.
Do not commit credentials, learner histories, local databases, or backups.
Medical content and assessment activities remain candidates pending review.
Some historical scripts refer to files outside this repository; those external
workspace dependencies are not included.

For changes to the local application, run:

```sh
python3 -m unittest discover -s app/tests -v
```
