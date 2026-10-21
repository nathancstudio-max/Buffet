// Étape 2 : GitHub renvoie ici après l'identification ; on échange le code contre un jeton
// et on le remet à l'éditeur du CMS (la fenêtre qui a ouvert la connexion), puis la fenêtre se ferme.
function page(message, isError) {
  const body = "<!doctype html><meta charset=\"utf-8\"><title>Connexion</title><body style=\"font-family:sans-serif;padding:32px\">" +
    (isError ? "<p>" + message + "</p><p>Fermez cette fenêtre et réessayez.</p>" : "") +
    (isError ? "" : "<script>" + message + "</script>") + "</body>";
  return new Response(body, { status: isError ? 400 : 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = (request.headers.get("Cookie") || "").match(/(?:^|;\s*)oauth_state=([^;]+)/);
  if (!code || !state || !cookie || cookie[1] !== state) return page("Connexion refusée (vérification de sécurité échouée).", true);
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) return page("Les identifiants GitHub ne sont pas configurés dans Cloudflare.", true);

  let data;
  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "User-Agent": "decap-cms-oauth" },
      body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code: code, redirect_uri: url.origin + "/api/callback" }),
    });
    data = await res.json();
  } catch (e) {
    return page("Impossible de joindre GitHub.", true);
  }
  if (!data || !data.access_token) return page("GitHub n'a pas donné d'accès (" + String((data && data.error) || "erreur") + ").", true);

  const msg = "authorization:github:success:" + JSON.stringify({ token: data.access_token, provider: "github" });
  const js =
    "(function(){var m=" + JSON.stringify(msg).replace(/</g, "\\u003c") + ";" +
    "function r(e){if(e.origin!==location.origin)return;window.opener.postMessage(m,e.origin);window.removeEventListener('message',r);setTimeout(function(){window.close()},300)}" +
    "window.addEventListener('message',r);window.opener&&window.opener.postMessage('authorizing:github',location.origin)})()";
  const res = page(js, false);
  res.headers.append("Set-Cookie", "oauth_state=; HttpOnly; Secure; Path=/api; SameSite=Lax; Max-Age=0");
  return res;
}
