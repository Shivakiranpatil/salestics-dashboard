import { ChevronDown } from "lucide-react";
import mapData from "../../assets/india-map-data.json";

// Projection: same as used to generate the JSON
// x = (lng - 68) / 29.5 * 400,  y = (37.5 - lat) / 30 * 440
function project(lng: number, lat: number) {
  return {
    x: Math.round(((lng - 68) / 29.5) * 400 * 10) / 10,
    y: Math.round(((37.5 - lat) / 30) * 440 * 10) / 10,
  };
}

// State abbreviation map
const STATE_ABBR: Record<string, string> = {
  INTG: "TS", INAP: "AP", INAR: "AR", INAS: "AS", INBR: "BR",
  INCT: "CG", INDL: "DL", INGA: "GA", INGJ: "GJ", INHR: "HR",
  INHP: "HP", INJH: "JH", INKA: "KA", INKL: "KL", INMP: "MP",
  INMH: "MH", INMN: "MN", INML: "ML", INMZ: "MZ", INNL: "NL",
  INOR: "OD", INPB: "PB", INRJ: "RJ", INSK: "SK", INTN: "TN",
  INTR: "TR", INUP: "UP", INUT: "UK", INWB: "WB", INJK: "JK",
  INLA: "LA", INCH: "CH", INPY: "PY", INDH: "DN",
};

// Small states to skip labels (too small to label)
const SKIP_LABEL = new Set(["INCH", "INPY", "INDH", "INGA", "INSK", "INDL"]);

// Cities projected with same formula
const cities = [
  { name: "Delhi",     ...project(77.22, 28.67), active: true  },
  { name: "Mumbai",    ...project(72.88, 19.08), active: true  },
  { name: "Bangalore", ...project(77.59, 12.97), active: true  },
  { name: "Chennai",   ...project(80.27, 13.08), active: true  },
  { name: "Kolkata",   ...project(88.36, 22.57), active: true  },
  { name: "Hyderabad", ...project(78.49, 17.38), active: false },
  { name: "Pune",      ...project(73.86, 18.52), active: false },
  { name: "Jaipur",    ...project(75.79, 26.91), active: false },
  { name: "Ahmedabad", ...project(72.58, 23.03), active: false },
];

// Neighboring country label positions (projected to same space)
const neighbors = [
  { name: "Afghanistan", ...project(66.5, 33.5) },
  { name: "Pakistan",    ...project(68.0, 29.0) },
  { name: "Nepal",       ...project(84.0, 28.2) },
  { name: "Bhutan",      ...project(89.5, 27.4) },
  { name: "Bangladesh",  ...project(90.5, 23.8) },
  { name: "Myanmar",     ...project(97.0, 22.5) },
  { name: "Sri Lanka",   ...project(80.7, 7.8)  },
  { name: "China",       ...project(85.0, 36.5) },
];

const { stateMap, centroids } = mapData as {
  stateMap: Record<string, { name: string; paths: string[] }>;
  centroids: Record<string, { x: number; y: number; name: string }>;
};

const listCities = [
  { name: "Delhi",     percentage: 32, active: true  },
  { name: "Mumbai",    percentage: 25, active: true  },
  { name: "Bangalore", percentage: 20, active: true  },
  { name: "Chennai",   percentage: 14, active: true  },
  { name: "Others",    percentage: 9,  active: false },
];

export function WidgetVisitors() {
  return (
    <div className="flex h-full gap-4 rounded-[10px] bg-[#fdfcff] p-4">

      {/* Map */}
      <div className="relative flex-1 rounded-[8px] overflow-hidden bg-[#d8eaf5]">
        <svg
          viewBox="0 0 400 440"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <style>{`
              @keyframes vp1{0%{r:8;opacity:.7}70%{r:20;opacity:0}100%{r:20;opacity:0}}
              @keyframes vp2{0%{r:5;opacity:.5}70%{r:13;opacity:0}100%{r:13;opacity:0}}
              .vr1{animation:vp1 2s ease-out infinite}
              .vr2{animation:vp2 2s ease-out .6s infinite}
            `}</style>
            <filter id="stateShadow" x="-2%" y="-2%" width="104%" height="106%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#7aaac0" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Ocean background */}
          <rect width="400" height="440" fill="#d8eaf5" />

          {/* Graticule */}
          {[80, 160, 240, 320].map(x => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="440" stroke="#c0d8ea" strokeWidth="0.4" strokeDasharray="3,6" />
          ))}
          {[80, 160, 240, 320, 400].map(y => (
            <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#c0d8ea" strokeWidth="0.4" strokeDasharray="3,6" />
          ))}

          {/* All state polygons */}
          {Object.entries(stateMap).map(([id, state]) =>
            state.paths.map((d, pi) => (
              <path
                key={`${id}-${pi}`}
                d={d}
                fill="#e4f0f8"
                stroke="#9dc4d8"
                strokeWidth="0.8"
                strokeLinejoin="round"
                filter="url(#stateShadow)"
              />
            ))
          )}

          {/* State border lines (re-draw strokes on top for crispness) */}
          {Object.entries(stateMap).map(([id, state]) =>
            state.paths.map((d, pi) => (
              <path
                key={`${id}-${pi}-s`}
                d={d}
                fill="none"
                stroke="#88b8ce"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
            ))
          )}

          {/* Neighboring country labels */}
          {neighbors.map(n => (
            <text
              key={n.name}
              x={n.x} y={n.y}
              fontSize="8.5"
              fontFamily="Plus Jakarta Sans,sans-serif"
              fill="#6898b8"
              textAnchor="middle"
              fontStyle="italic"
              fontWeight="400"
            >
              {n.name}
            </text>
          ))}

          {/* State abbreviation labels */}
          {Object.entries(centroids).map(([id, c]) => {
            if (SKIP_LABEL.has(id)) return null;
            const abbr = STATE_ABBR[id] || id.replace("IN","");
            return (
              <text
                key={id}
                x={c.x} y={c.y}
                fontSize="7"
                fontFamily="Plus Jakarta Sans,sans-serif"
                fill="#3878a0"
                textAnchor="middle"
                dominantBaseline="middle"
                fontWeight="700"
                opacity="0.85"
              >
                {abbr}
              </text>
            );
          })}

          {/* City markers */}
          {cities.map(city => (
            <g key={city.name}>
              {city.active && (
                <>
                  <circle cx={city.x} cy={city.y} r="8" fill="none" stroke="#ff683a" strokeWidth="1.5" opacity="0" className="vr1" />
                  <circle cx={city.x} cy={city.y} r="5" fill="none" stroke="#ff683a" strokeWidth="1" opacity="0" className="vr2" />
                </>
              )}
              {/* Drop shadow */}
              <circle cx={city.x+1} cy={city.y+1} r={city.active ? 6 : 4} fill="#003366" opacity="0.2" />
              {/* Dot */}
              <circle
                cx={city.x} cy={city.y}
                r={city.active ? 6 : 4}
                fill={city.active ? "#ff683a" : "#4a8fc0"}
                stroke="white"
                strokeWidth="1.5"
              />
              {/* Label */}
              <text
                x={city.x}
                y={city.y - 9}
                fontSize="7.5"
                fontFamily="Plus Jakarta Sans,sans-serif"
                fill={city.active ? "#b83010" : "#1a4060"}
                textAnchor="middle"
                fontWeight={city.active ? "700" : "500"}
              >
                {city.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Right panel */}
      <div className="flex w-[185px] shrink-0 flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-[#2a2b2a]">Visitors</h2>
          <button
            className="flex items-center gap-0.5 rounded-[5px] bg-[#f3f3f3] px-2.5 py-1.5 text-[11px] font-medium text-[#555] hover:bg-[#ebebeb] transition-colors"
            data-testid="button-visitors-period"
          >
            Today
            <ChevronDown size={12} className="ml-1" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff683a]" />
            <span className="text-[10px] text-[#8c8d8c]">Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#4a8fc0]" />
            <span className="text-[10px] text-[#8c8d8c]">Inactive</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          {listCities.map(v => (
            <div key={v.name} className="flex items-center gap-2.5" data-testid={`visitor-city-${v.name.toLowerCase()}`}>
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${v.active ? "border-[#ffc4b0] bg-[#fff5f2]" : "border-[#c0d8ee] bg-[#eef4fb]"}`}>
                <div className={`h-2 w-2 rounded-full ${v.active ? "bg-[#ff683a]" : "bg-[#4a8fc0]"}`} />
              </div>
              <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-[#2a2b2a] truncate">{v.name}</span>
                  {v.active && (
                    <span className="text-[9px] font-bold text-[#ff683a] bg-[#fff5f2] border border-[#ffc4b0] px-1 rounded leading-tight">LIVE</span>
                  )}
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#f3f3f3]">
                  <div className="h-full rounded-full" style={{ width: `${v.percentage}%`, background: v.active ? "#ff683a" : "#4a8fc0" }} />
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#2a2b2a] shrink-0">{v.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
