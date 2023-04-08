#!/usr/bin/env ruby

Dir.chdir ENV["ROOT"]

print STDIN.read.gsub(/<!--\s*%(.*?)-->/) {
  %x(#{$1})
}
