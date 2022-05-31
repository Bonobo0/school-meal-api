/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [{
            source: '/fetch/schoolID/:school_name',
            destination: 'https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=100&SCHUL_NM=:school_name',
        }, ]
    }
}

module.exports = nextConfig