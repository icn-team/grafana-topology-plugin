// Libraries
import React, { PureComponent, CSSProperties } from 'react';
import { debounce } from 'lodash';

// Types
import { TopologyOptions, networkDefaultOptions, linkDefaults } from './types';
import { PanelProps } from '@grafana/data';
import { scaleLinear } from 'd3';

// Vis js
import Graph from 'react-graph-vis';

interface Props extends PanelProps<TopologyOptions> {}

interface State {
  graph: any;
}

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log('Nooo');
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // this.setState({ hasError: false });
      console.log('Error!!');
      this.state = { hasError: false };
      return <h1>Error creating the network topology.</h1>;
    }

    return this.props.children;
  }
}

export class TopologyPanel extends PureComponent<Props, State> {
  network: any;
  colorScaleLin: any;
  colorScaleLog: any;
  style: CSSProperties = {};

  constructor(props: Props) {
    super(props);

    this.state = {
      graph: { nodes: [], edges: [] },
    };

    this.updateBackground(props.options.backgroundImage);

    this.colorScaleLin = scaleLinear<string>()
      .domain([0, 10, 20, 30, 40, 50])
      .range(['black', 'green', 'blue', 'purple', 'black', 'yellow']);
    this.colorScaleLog = scaleLinear<string>()
      .domain([50, 200, 1000])
      .range(['yellow', 'orange', 'red']);
  }

  updateTopology = debounce(() => {
    this.processContent(this.props.options);
  }, 150);

  updateBackground(backgroundImage: string) {
    this.style = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };
  }

  componentDidMount() {
    this.updateTopology();
  }

  componentDidUpdate(prevProps: Props) {
    // Since any change could be referenced in a template variable,
    // This needs to process everytime (with debounce)

    const { data } = this.props;
    const { content } = this.props.options;
    const { backgroundImage } = this.props.options;

    if (backgroundImage !== prevProps.options.backgroundImage) {
      this.updateBackground(backgroundImage);
    }

    if (content !== prevProps.options.content) {
      this.updateTopology();
    }

    const bandwidth = new Map<string, number>();

    if (data.series.length < 1) {
      console.log('No available data....');
    } else {
      data.series.forEach(element => {
        const name: string = element.fields[0].name;
        const length: number = element.fields[0].values.length;
        let linkBw = bandwidth.get(name);
        if (linkBw === undefined) {
          linkBw = 0;
        }
        bandwidth.set(name, linkBw + element.fields[0].values.get(length - 1));
      });

      Object.keys(this.network.body.edges).forEach(key => {
        let bw = bandwidth.get(key);
        if (bw !== undefined) {
          bw = Math.round((bw / 1024 / 1024) * 8 * 10) / 10;

          let color;
          let width;
          let label;

          if (bw < linkDefaults.bwMid) {
            color = this.colorScaleLin(bw);
            width = (linkDefaults.edgeWidthMid * bw) / linkDefaults.bwMid;
          } else {
            color = this.colorScaleLog(bw);
            width = linkDefaults.edgeWidthMid + (Math.log10(bw - linkDefaults.bwMid) * (linkDefaults.edgeWidthMax - linkDefaults.edgeWidthMin)) / 4;
          }

          if (bw !== 0.0) {
            if (bw > 1000) {
              label = Math.round(bw / 10) / 100 + ' Gbps';
            } else {
              label = bw + ' Mbps';
            }
          } else {
            label = '';
          }

          this.network.body.data.edges.update({ id: key, color: color, width: width, label: label });
        }
      });
    }

    if (this.network) {
      this.network.setSize(this.props.width, this.props.height);
      this.network.redraw();
    }
  }

  processTopology(json: any) {
    this.network.body.data.nodes.clear();
    this.network.body.data.edges.clear();
    this.network.body.data.nodes.add(json.nodes);
    this.network.body.data.edges.add(json.edges);
  }

  plotTopology(content: string) {
    console.log('Plot topology!');
    try {
      this.processTopology(JSON.parse(content));
    } catch (SyntaxError) {
      console.log('Invalid json.');
    }
  }

  processContent(options: TopologyOptions) {
    console.log('Process content!');
    const { mode, content } = options;

    if (!content) {
      return;
    }

    if (mode === 'JSON') {
      this.plotTopology(content);
    }
  }

  render() {
    console.log('Render');
    const { graph } = this.state;

    const events = {
      select: event => {},
    };

    return (
      <div style={this.style}>
        <ErrorBoundary>
          <Graph
            graph={{ nodes: graph.nodes, edges: graph.edges }}
            options={networkDefaultOptions}
            events={events}
            getNetwork={nw => {
              this.network = nw;
            }}
          />
        </ErrorBoundary>
      </div>
    );
  }
}
