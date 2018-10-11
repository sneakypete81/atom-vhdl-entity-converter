add_i : add
generic map (
   WIDTH  => WIDTH,
   HEIGHT => HEIGHT
)
port map (
   clk    => clk,
   in     => in,
   output => output
);
