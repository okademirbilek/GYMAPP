import { enqueueSnackbar } from "notistack";

export function convertTime(timestamp, lang) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (timestamp) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString(lang, options);
  }
}

export function callSnackBar() {
  enqueueSnackbar("Success", {
    anchorOrigin: { vertical: "bottom", horizontal: "right" },
    variant: "success",
  });
}
