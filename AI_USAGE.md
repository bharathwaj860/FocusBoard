# AI Usage Disclosure

AI assistance was used during development to help plan the component structure, explain React concepts, and review implementation ideas.

## Example prompt
"Help me build a responsive React task dashboard with task CRUD, status and priority filters, search, task statistics, a three-slide Focus Notes carousel, and localStorage persistence. Explain the code in beginner-friendly steps."

## AI suggestion reviewed
An AI suggestion was to store the currently filtered task list in localStorage. This was not used because it could overwrite tasks hidden by the active filters. The app instead persists the complete task array and derives the visible list from search and filter state.

## Verification
The implementation should be tested locally in desktop and mobile viewport sizes. Task creation, editing, deletion, status changes, combined filters, carousel navigation, page refresh persistence, and the production build should be checked before submission.

AI-generated code was reviewed and adapted as part of the project; it should not be represented as independently authored without review.
