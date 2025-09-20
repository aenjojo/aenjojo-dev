export function GET() {
  const robots = `
    User-agent: *
    Disallow: /
    Allow: /projects/
  `.replaceAll(/ {2,}/g, '');

  return new Response(robots, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
