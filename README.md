# Blink Assessment

## by Derek Cook

run with
`npm run dev`

### Notes

- There's not a unique name from each dosage of one drug that I could plug into `/drugs/:drugName` so I'm picking the first item in `conceptProperties` to display on the detail page.
- There's some data inconsistency that I'd handle better if I had more time.
- I'm using reasonable cache defaults for react-query, assuming `getDrugs` data is not written often.
