require_relative '../patricia'
require 'optparse'


module CLI

  @@options = {}

  def self.options
    @@options
  end

  OptionParser.new do |opts|
    opts.banner = 'Usage: patricia <markup-dir> [output-dir] [options]'
    opts.separator '---------------------------------------------------'
    opts.separator ''
    opts.separator 'Options:'

    opts.on('-c', '--css DIR', 'Directory with CSS files to be',
            'included in the output',
            '  (All .css files in this directory',
            '  and its subdirectories will be', '  hovered up.)') do |v|
      options[:css] = File.expand_path(v.strip)
    end

    opts.on('-j', '--js DIR', 'Directory with JavaScript files to be',
            'included in the output', '  (All .js files in this directory',
            '  and its subdirectories will be', '  hovered up.)') do |v|
      options[:js] = File.expand_path(v.strip)
    end

    opts.on('-t', '--[no-]tooltips', 'Show tooltips with filepaths when',
            '  hovering over elements in the',
            '  sidebar (default: hide)') do |v|
      options[:tooltips] = v
    end

    opts.on('-p', '--port PORT', Integer,
            'Port to run the server on') do |v|
      options[:port] = v
    end

    # Description

    opts.separator ''
    opts.separator 'Info:'

    opts.on_tail('-h', '--help', 'Show this message') do |v|
      puts opts
      exit
    end
    opts.on_tail('-v', '--version', 'Show the version') do |v|
      puts Patricia::VERSION
      exit
    end
  end.parse!

  @@options[:markup_dir] = ARGV.shift
  @@options[:output_dir] = ARGV.shift

  if !@@options[:markup_dir]
    puts 'ERROR: Need a markup directory'
    exit
  end

end
