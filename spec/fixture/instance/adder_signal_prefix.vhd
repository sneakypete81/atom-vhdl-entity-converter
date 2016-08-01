add_i : add
generic map (
  WIDTH  => WIDTH,
  HEIGHT => HEIGHT
)
port map (
  clk    => s_clk,
  in     => s_in,
  output => s_output
);
