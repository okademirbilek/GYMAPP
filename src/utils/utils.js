import { enqueueSnackbar } from "notistack";

export function convertTime(timestamp) {
  if (timestamp) {
    return new Date(timestamp.seconds * 1000).toDateString();
  }
}

export function callSnackBar() {
  enqueueSnackbar("Success", {
    anchorOrigin: { vertical: "bottom", horizontal: "right" },
    variant: "success",
  });
}
