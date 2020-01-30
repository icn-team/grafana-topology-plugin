import { PanelPlugin } from '@grafana/data';

import { TopologyPanelEditor } from './TopologyPanelEditor';
import { TopologyPanel } from './TopologyPanel';
import { TopologyOptions, defaults } from './types';

export const plugin = new PanelPlugin<TopologyOptions>(TopologyPanel).setDefaults(defaults).setEditor(TopologyPanelEditor);
// .setPanelChangeHandler((options: TopologyOptions, prevPluginId: string, prevOptions: any) => {
//   if (prevPluginId === 'cisco-topology-plugin') {
//     return prevOptions as TopologyOptions;
//   }
//   return options;
// });
