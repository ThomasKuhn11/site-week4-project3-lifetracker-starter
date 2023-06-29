\echo 'Delete and recreate lifetrackerdb?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lifetrackerdb WITH (FORCE);
CREATE DATABASE lifetrackerdb;
\connect lifetrackerdb

\i lifetracker-schema.sql

