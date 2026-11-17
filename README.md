# Flex

App mobile de suivi commercial (syndics du 06, demandes d'intervention, commissions).
Installable depuis le navigateur, hébergée sur GitHub Pages, données dans Supabase.

## Fichiers
- `index.html` : toute l'app.
- `config.js` : adresse du projet Supabase et clé publique.
- `sw.js`, `manifest.webmanifest`, `icons/` : installation sur l'écran d'accueil.
- `supabase/migrations/` : tables, règles d'accès et reprise des cabinets.

## Mise en route
1. Supabase, SQL Editor : exécuter `supabase/migrations/20261117000000_flex_init.sql` (rejouable sans risque).
2. Supabase, Authentication, Sign In / Providers : désactiver « Allow new users to sign up ».
3. Supabase, Authentication, Users, Add user : créer un compte par personne (cocher Auto Confirm).
4. Remplir `config.js` avec Project URL et la clé anon (Settings, API).
5. GitHub, Settings, Pages : Deploy from a branch, `main`, dossier `/ (root)`.
