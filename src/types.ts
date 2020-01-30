export type TopologyMode = 'JSON';
export interface TopologyOptions {
  mode: TopologyMode;
  backgroundImage: string;
  content: string;
}

export interface LinkConstants {
  widthScale: number;
  edgeWidthMin: number;
  edgeWidthMid: number;
  edgeWidthMax: number;
  bwMid: number;
  edgerateMax: number;
  coordinateScale: number;
  cacheRadius: number;
  maxBwValue: number;
}

export const linkDefaults: LinkConstants = {
  widthScale: 2,
  edgeWidthMin: 5,
  edgeWidthMid: 12,
  edgeWidthMax: 20,
  bwMid: 15,
  edgerateMax: 250000,
  coordinateScale: 10,
  cacheRadius: 120,
  maxBwValue: 1200,
};

export const networkDefaultOptions = {
  layout: {
    hierarchical: false,
  },
  physics: {
    barnesHut: { gravitationalConstant: -30000 },
    stabilization: { iterations: 2500 },
  },
  nodes: {
    physics: false,
    font: {
      size: 20,
      color: 'black',
      strokeColor: 'white',
      strokeWidth: 2,
      align: 'top',
    },
  },
  edges: {
    color: '#808080',
    arrows: {
      to: false,
      from: false,
      middle: false,
    },
    font: {
      size: 35,
      color: 'white',
      strokeColor: 'white',
      strokeWidth: 2,
      align: 'top',
      vadjust: -20,
    },
  },
  height: '500px',
  groups: {
    router: {
      shape: 'image',
      image: 'public/plugins/cisco-topology-plugin/img/icn-router.png',
    },
    ue: {
      shape: 'image',
      image: 'public/plugins/cisco-topology-plugin/img/tablet.png',
    },
  },
};

export const defaults: TopologyOptions = {
  mode: 'JSON',
  backgroundImage: '',
  content: `{
    "nodes": [
      { "id": 1, "label": "Node 1", "title": "node 1 tootip text", "group": "router" },
      {  "id": 2, "label": "Node 2",  "title": "node 2 tootip text", "group": "router" }
    ],
    "edges": [
      { "from": 1, "to": 2, "id": "test2" }
    ]
}`,
};
