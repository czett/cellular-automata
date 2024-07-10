using Plots

function apply_rule(rule, left, center, right)
    index = 4*left + 2*center + right
    return (rule >> index) & 1
end

function compute_next_state(current_state, rule)
    next_state = zeros(Int, length(current_state))
    for i in 2:length(current_state)-1
        next_state[i] = apply_rule(rule, current_state[i-1], current_state[i], current_state[i+1])
    end
    return next_state
end

function generate_automaton(initial_state, rule, generations)
    num_cells = length(initial_state)
    automaton = zeros(Int, generations, num_cells)
    automaton[1, :] = initial_state
    
    for gen in 2:generations
        automaton[gen, :] = compute_next_state(automaton[gen-1, :], rule)
    end
    
    return automaton
end

function main(rule)
    num_cells = 200
    generations = 300
    initial_state = zeros(Int, num_cells)
    initial_state[div(num_cells, 2) + 1] = 1 # Start with a single black cell in the middle

    automaton = generate_automaton(initial_state, rule, generations)

    # Define a custom color gradient from black to white
    black_to_white = cgrad([:white, :black])

    heatmap(automaton, color=black_to_white, axis=false, border=false)
end

# Change the rule dynamically
rule = 30
main(rule)
