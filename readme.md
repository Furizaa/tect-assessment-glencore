# Glencore Tech Assessment

View solution online in a serverless function: [https://glencore-assessment-c7mif9gc3.now.sh/](https://glencore-assessment-c7mif9gc3.now.sh/)

Find the code here: https://github.com/Furizaa/tect-assessment-glencore

### Notes about the solution:

- `Reducers` and `Actions` have full type coverage.

- I try to challange myself with this code assessments and to learn new things. Thats why I opted for `Next.js` instaed of `create-react-app` or a custom `Webpack/Babel` config which I'm more familliar with. For the same reason I decided to not use `Redux` or `Mobx`, but instead tried to manage state with the new `React` Hooks and the new Context API.

- There is no global consistency validation. Instead the UI prevents the user from creating an invalid state.

The following points are corners I had to cut due to time constraints:

- I only added reducer tests. These are the most complex business logic in the code. If I had the time to test components I would have used `enzyme`. Also there are no integration tests, browser tests or visual tests as this would blew the assessment out of proportion.
- The provided solution should generally works on mobile devices but it's not optimized for them.
- There is no user input normalization.
- There is no code lint tool setup. I've used Prettier during development.
- Some `@ts-ignore` scattered around the code. This is only done to circumvent a faulty definition file in the `rebass` library.
- A11y was not a major factor.
- A lot of some minor quality improvements could be made.
