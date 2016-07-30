component add
generic (
  WIDTH  : integer := 3;
  HEIGHT : integer := 2
);
port (
  clk    : in  std_logic;
  in     : in  std_logic_vector(WIDTH-1 downto 0);
  output : out std_logic_vector(WIDTH-1 downto 0)
);
end component add;
