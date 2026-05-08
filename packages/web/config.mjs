const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://jekko.ai" : `https://${stage}.jekko.ai`,
  console: stage === "production" ? "https://jekko.ai/auth" : `https://${stage}.jekko.ai/auth`,
  email: "contact@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/anomalyco/jekko",
  discord: "https://jekko.ai/discord",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/docs/" },
  ],
}
