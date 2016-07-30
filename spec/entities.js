'use babel'

export const entities = {
  adder: {
    name: "add",
    generics: [{name: "WIDTH", type: "integer", default: "3"},
               {name: "HEIGHT", type: "integer", default: "2"}],
    ports: [{name: 'clk', dir: 'in', type: 'std_logic'},
            {name: 'in', dir: 'in', type: 'std_logic_vector(WIDTH-1 downto 0)'},
            {name: 'output', dir: 'out', type: 'std_logic_vector(WIDTH-1 downto 0)'}]},

  adderWithCase: {
    name: "addWithCase",
    generics: [{name: 'wiDTH', type: 'Integer', default: '3'},
               {name: 'HEight', type: 'inTeger', default: '2'}],
    ports: [{name: 'Clk', dir: 'In', type: 'STD_LOGIC'},
            {name: 'IN', dir: 'in', type: 'Std_Logic_Vector(width-1 DownTo 0)'},
            {name: 'OutPut', dir: 'oUt', type: 'Std_Logic_Vector(width-1 DownTo 0)'}]},

  adderNoDefault: {
    name: "add",
    generics: [{name: "WIDTH", type: "integer", default: undefined},
               {name: "HEIGHT", type: "integer", default: undefined}],
    ports: [{name: 'clk', dir: 'in', type: 'std_logic'},
            {name: 'in', dir: 'in', type: 'std_logic_vector(WIDTH-1 downto 0)'},
            {name: 'output', dir: 'out', type: 'std_logic_vector(WIDTH-1 downto 0)'}]}
  }
