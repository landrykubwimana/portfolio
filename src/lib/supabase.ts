/**
 * Connexion à la base commune avec aeeureka.
 *
 * Un seul endroit dans tout le dépôt ouvre cette connexion, pour que la règle
 * ci-dessous n'ait qu'un seul endroit où être respectée.
 *
 * ⚠️ La clé utilisée est la clé « anon », publique par conception, et le
 *    portfolio n'en fait qu'un usage de LECTURE. La clé service_role ignore
 *    toute la sécurité de la base et ne doit JAMAIS entrer dans ce dépôt, à
 *    aucune condition.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from 'astro:env/server';

/** Renvoie null si les variables d'environnement sont absentes. */
export function connexion(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  // Pas de session à conserver : on lit sans utilisateur connecté.
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Message unique quand les variables manquent, pour ne pas le réécrire partout. */
export function avertirVariablesAbsentes(quoi: string): void {
  console.warn(
    `[${quoi}] SUPABASE_URL / SUPABASE_ANON_KEY absents — section vide. ` +
      'Local : voir .env.example. En ligne : Vercel → Settings → Environment Variables.'
  );
}
