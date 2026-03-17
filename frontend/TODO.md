# Fix Zod "Invalid input: expected string, received undefined" and "Invalid email format" in Login/Register

Status: In progress

**Completed:**

- [x] Analyzed auth.schema.ts, Login.tsx, Register.tsx, PasswordInput.tsx, authSlice.ts

**Remaining Steps:**

1. Add `defaultValues` and `shouldUnregister: false` to useForm in Login.tsx to initialize fields as empty strings and prevent undefined.
2. Add similar fixes to Register.tsx.
3. Improve email placeholder for better UX (e.g., &#39;example@email.com&#39;).
4. Test form submissions:
   - Empty fields
   - Invalid email (e.g., &#39;invalid&#39;)
   - Valid inputs
5. Update TODO.md with completion.
6. Run `cd frontend &amp;&amp; npm run dev` to test.

**Status:** Forms updated with defaultValues and shouldUnregister: false to fix undefined errors. Email placeholders improved for better UX.
