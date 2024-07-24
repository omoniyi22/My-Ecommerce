/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

// MONGODB_URI = mongodb+srv://omoniyioluwaseun22:Li8fnRJpyXkV7LiJ@cluster.k5dvjqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster
// GOOGLE_ID = 791904041445-nsnp7c14pg2abtforhh7ltfhlgh8vkd5.apps.googleusercontent.com
// GOOGLE_SECRET = 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
// MONGODB_URI = mongodb+srv://omoniyioluwaseun22:Li8fnRJpyXkV7LiJ@cluster.k5dvjqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster