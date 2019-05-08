module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": "airbnb",
    "rules": {
        "no-underscore-dangle": [2, { "allow": ["_id", "__dirname"] }],
        "indent": [ 2, 4 ],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-filename-extension": false,
        "react/prop-types": false,
        "template-curly-spacing": [ 2, "always" ],
        "object-curly-spacing": [ 2, "always" ],
        "computed-property-spacing": [ 2, "always" ],
        "no-multiple-empty-lines": [ 2, { "max": 1, "maxEOF": 0, "maxBOF": 0 } ],
        "quotes": [ 2, "single", "avoid-escape" ],
        "no-use-before-define": [ 2, { "functions": false } ],
        "prefer-const": 1,
        "max-len": ["error", { "code": 200 }],
        "complexity": ["error", { "max": 10 }],
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to" ]
        }],
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "import/no-extraneous-dependencies": ["error", {"devDependencies": [
            'src/**/**/*.test.js',
            'src/server/index.js'
        ]}],
    },
    "parser": "babel-eslint"
}