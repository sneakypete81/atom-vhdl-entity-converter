entity add is
generic (
  -- A comment on its own line without colons
  WIDTH  : integer := 3; -- A comment at the end of a line with no colons
  -- A comment on its own line with  : a colon
  HEIGHT : integer := 2 -- A comment at the end of a line with : a colon
);
port (
  -- A comment on its own line without colons
  clk    : in  std_logic;
  -- A comment on its own line with  : a colon
  in     : in  std_logic_vector(WIDTH-1 downto 0); -- A comment at the end of a line with no colons
  output : out std_logic_vector(WIDTH-1 downto 0) -- A comment at the end of a line with : a colon
);
end add;
