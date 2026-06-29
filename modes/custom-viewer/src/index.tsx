import i18n from 'i18next';

import {
  basicLayout,
  basicRoute,
  cornerstone,
  extensionDependencies,
  initToolGroups,
  isValidMode,
  layoutTemplate,
  mode as basicMode,
  modeFactory as basicModeFactory,
  modeInstance as basicModeInstance,
  NON_IMAGE_MODALITIES,
  ohif,
  onModeEnter as basicOnModeEnter,
  onModeExit,
  sopClassHandlers,
  toolbarButtons,
  toolbarSections as basicToolbarSections,
} from '@ohif/mode-basic';

import { id } from './id';

const measurementTools = [
  'Angle',
  ...basicToolbarSections.MeasurementTools.filter(toolId => toolId !== 'Angle'),
];

const moreTools = basicToolbarSections.MoreTools.filter(toolId => toolId !== 'Angle');

export const toolbarSections = {
  ...basicToolbarSections,
  MeasurementTools: measurementTools,
  MoreTools: moreTools,
};

export const customViewerLayout = {
  ...basicLayout,
  id: ohif.layout,
  props: {
    ...basicLayout.props,
    leftPanels: [cornerstone.measurements],
    rightPanels: [ohif.thumbnailList, cornerstone.segmentation],
    rightPanelClosed: false,
  },
};

export const customViewerRoute = {
  ...basicRoute,
  path: 'custom-viewer',
  layoutTemplate,
  layoutInstance: customViewerLayout,
};

function onModeEnter(args: withAppTypes) {
  basicOnModeEnter.call(this, args);

  const { customizationService } = args.servicesManager.services;

  customizationService.setCustomizations({
    'viewportOverlay.topRight': {
      $push: [
        {
          id: 'OHIFVersion',
          inheritsFrom: 'ohif.overlayItem',
          label: '',
          title: 'OHIF version',
          contentF: () => `OHIF v${process.env.VERSION_NUMBER?.trim() || 'unknown'}`,
        },
      ],
    },
  });
}

export const modeInstance = {
  ...basicModeInstance,
  id,
  routeName: 'custom-viewer',
  displayName: i18n.t('Modes:Custom Viewer'),
  toolbarSections,
  onModeEnter,
  onModeExit,
  validationTags: {
    study: [],
    series: [],
  },
  isValidMode,
  routes: [customViewerRoute],
  extensions: extensionDependencies,
  hangingProtocol: 'default',
  sopClassHandlers,
  toolbarButtons,
  enableSegmentationEdit: false,
  nonModeModalities: NON_IMAGE_MODALITIES,
};

export function modeFactory({ modeConfiguration }) {
  let modeInstance = customMode.modeInstance;
  if (modeConfiguration) {
    modeInstance = basicModeFactory.call(
      {
        modeInstance,
      },
      { modeConfiguration }
    );
  }
  return modeInstance;
}

const customMode = {
  ...basicMode,
  id,
  modeFactory,
  modeInstance,
  extensionDependencies,
};

export default customMode;
export { initToolGroups, toolbarButtons };
