module.exports = {
    presets: [
        '@babel/preset-typescript',
    ],
    plugins: [
        ['babel-plugin-direct-import', { modules: ['@mui/material', '@mui/icons-material'] }],
    ],
};
