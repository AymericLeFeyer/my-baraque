/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require("next-plausible");
const withPWA = require('next-pwa')({
    dest: 'public'
  })

const nextConfig = withPlausibleProxy()({});

module.exports = withPWA(nextConfig);
