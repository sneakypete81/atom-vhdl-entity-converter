entity add is
generic (
  WIDTH  : integer := 8;
  HEIGHT : integer := 8
);
port (
  clk    : in  std_logic;
  rst    : in  std_logic;
  in1    : in  std_logic_vector(WIDTH-1 downto 0);
  in2    : in  std_logic_vector(WIDTH-1 downto 0);
  output : out std_logic_vector(WIDTH-1 downto 0);
  start  : in  std_logic;
  done   : out std_logic
);
end add;
