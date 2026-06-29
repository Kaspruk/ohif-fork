# custom-viewer

Custom OHIF viewer mode for the test assignment.

It extends `@ohif/mode-basic` and overrides only mode-level composition:

- swaps DICOM Browser and Measurements panels;
- promotes Angle to the first active measurement tool;
- adds the OHIF version to every Cornerstone viewport overlay.
