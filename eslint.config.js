// 필요한 ESLint 관련 모듈들을 불러옵니다
import js from "@eslint/js"; // ESLint의 기본 자바스크립트 구성을 불러옵니다
import globals from "globals"; // 전역 변수들의 정의를 불러옵니다
import reactHooks from "eslint-plugin-react-hooks"; // React Hooks 규칙을 검사하는 플러그인입니다
import reactRefresh from "eslint-plugin-react-refresh"; // React Refresh 기능을 지원하는 플러그인입니다
import prettier from "eslint-plugin-prettier"; // Prettier를 ESLint와 통합하는 플러그인입니다
import prettierConfig from "eslint-config-prettier"; // ESLint와 Prettier 간의 충돌을 방지하는 구성입니다

// ESLint 설정을 배열 형태로 내보냅니다
export default [
  // 'dist' 폴더는 린팅 대상에서 제외합니다
  { ignores: ["dist"] },

  // ESLint와 Prettier 간의 충돌을 방지하는 구성을 적용합니다
  prettierConfig,

  // 자바스크립트와 JSX 파일에 적용할 규칙을 정의합니다
  {
    // 이 설정이 적용될 파일 패턴을 지정합니다
    files: ["**/*.{js,jsx}"],

    // 언어 관련 옵션을 설정합니다
    languageOptions: {
      ecmaVersion: 2020, // 사용할 ECMAScript 버전을 지정합니다
      globals: globals.browser, // 브라우저 환경의 전역 변수들을 허용합니다
      parserOptions: {
        ecmaVersion: "latest", // 최신 ECMAScript 문법을 파싱할 수 있게 합니다
        ecmaFeatures: {
          jsx: true, // JSX 문법 지원을 활성화합니다
        },
        sourceType: "module", // ES 모듈 시스템을 사용함을 명시합니다
      },
    },

    // 사용할 플러그인들을 지정합니다
    plugins: {
      "react-hooks": reactHooks, // React Hooks 규칙 검사 플러그인을 등록합니다
      "react-refresh": reactRefresh, // React Refresh 지원 플러그인을 등록합니다
      prettier: prettier, // Prettier 플러그인을 등록합니다
    },

    // 적용할 규칙들을 설정합니다
    rules: {
      ...js.configs.recommended.rules, // ESLint의 자바스크립트 권장 규칙들을 적용합니다
      ...reactHooks.configs.recommended.rules, // React Hooks의 권장 규칙들을 적용합니다
      "prettier/prettier": "error", // Prettier 규칙을 위반할 경우 에러로 표시합니다
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }], // 사용되지 않는 변수는 에러로 표시하되, A-Z나 _로 시작하는 변수는 예외로 합니다
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }], // 컴포넌트만 내보내도록 권장하나, 상수 내보내기는 허용합니다
    },
  },
];
