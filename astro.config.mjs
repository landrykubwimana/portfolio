// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // TODO: remplace par ton vrai domaine quand tu en auras un (ex. https://landrykubwimana.com)
  site: 'https://example.com',

  /**
   * Adaptateur Vercel + ISR.
   *
   * Le site reste statique PARTOUT, sauf les pages qui déclarent
   * `export const prerender = false` (aujourd'hui : la page d'accueil, parce
   * qu'elle affiche les avis de l'Académie et doit rester synchronisée avec
   * aeeureka.com).
   *
   * `expiration: 60` = la page fabriquée est réutilisée pendant 60 secondes.
   * Conséquence : au maximum UNE lecture de la base par minute, quel que soit
   * le nombre de visiteurs, et un décalage maximum d'une minute avec aeeureka.
   * Pour resserrer (ou relâcher), change ce seul nombre.
   */
  adapter: vercel({
    isr: { expiration: 60 },
  }),

  /**
   * Variables d'environnement.
   *
   * `context: 'server'` + `access: 'secret'` = lues côté serveur AU MOMENT de
   * l'exécution, jamais recopiées dans le code envoyé au navigateur.
   * `optional: true` = si elles manquent, le site se construit et s'affiche
   * quand même ; seule la section des avis reste vide (avec un avertissement
   * dans les journaux). Un portfolio ne doit pas tomber en panne pour ça.
   *
   * ⚠️ La clé attendue est la clé « anon » de Supabase, publique par
   *    conception. La clé service_role n'a rien à faire dans ce dépôt.
   */
  env: {
    schema: {
      SUPABASE_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      SUPABASE_ANON_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
