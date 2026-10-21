// Étape 1 de la connexion au CMS : renvoie l'éditeur vers GitHub pour s'identifier.
// Tourne sur Cloudflare Pages (gratuit). Aucun secret n'est écrit ici : ils sont dans les réglages Cloudflare.
export async function onRequestGet({ request, env }) {
  if (!env.GITHUB_CLIENT_ID) return new Response("GITHUB_CLIENT_ID manquant dans les réglages Cloudflare.", { status: 500 });
  const url = new URL(request.url);
  const state = crypto.randomUUID();                       // protège contre les connexions forcées
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: url.origin + "/api/callback",
    scope: "repo",
    state: state,
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: "https://github.com/login/oauth/authorize?" + params.toString(),
      "Set-Cookie": "oauth_state=" + state + "; HttpOnly; Secure; Path=/api; SameSite=Lax; Max-Age=600",
      "Cache-Control": "no-store",
    },
  });
}
